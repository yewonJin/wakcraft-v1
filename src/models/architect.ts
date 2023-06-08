import { Schema, Model, model, models } from 'mongoose';
import { fuzzySearchRegExp } from '@/utils/fuzzySearch';
import { Architect, convertLineTierToTier, createTierArray } from '@/domain/architect';

// Define Schemes
const architectSchema = new Schema<Architect>({
   minecraft_id: {
      type: String,
      required: true,
      unique: true,
   },
   wakzoo_id: { type: String, unique: true },
   tier: { type: [String] },
   noobProHackerInfo: {
      win: { type: Number, default: 0 },
      participation: { type: Number, default: 0 },
   },
   portfolio: {
      noobProHacker: [
         {
            episode: { type: Number, required: true },
            subject: { type: String, required: true },
            line: { type: String, required: true },
            image_url: { type: String, required: true },
            youtube_url: { type: String, required: true },
            ranking: { type: Number, default: 0 },
         },
      ],
      placementTest: [
         {
            season: { type: Number },
            image_url: { type: String },
            placement_result: { type: String },
         },
      ],
      eventNoobProHacker: [
         {
            contentName: { type: String, required: true },
            episode: { type: Number, required: true },
            subject: { type: String, required: true },
            line: { type: String, required: true },
            image_url: { type: String, required: true },
            youtube_url: { type: String, required: true },
            ranking: { type: Number, default: 0 },
         },
      ],
   },
});

interface ArchitectModel extends Model<Architect> {
   findAll: () => Promise<Architect[]>;
   findAllWithoutPortfolio: () => Promise<Exclude<Architect[], 'portfolio'>>;
   findAllByLineTier: (tier: string) => Promise<Architect[]>;
   findAllByInput: (input: string) => Promise<Architect[]>;
   findOneByMinecraftId: (minecraft_id: string) => Promise<Architect>;
   findOneAndPushToPortfolio: (
      minecraft_id: string,
      payload: Architect['portfolio']['noobProHacker'][0],
   ) => Promise<void>;
   findAllAndSetTierUnRanked: () => Promise<void>;
   findOneAndPushToPlacementTest: (
      minecraft_id: string,
      payload: Architect['portfolio']['placementTest'][0],
   ) => Promise<void>;
   findOneAndPushToEventNoobProHacker: (
      minecraft_id: string,
      payload: Architect['portfolio']['eventNoobProHacker'][0],
   ) => Promise<void>;
   findOneAndUnSetTierFirstIndex: (minecraft_id: string) => Promise<void>;
   findOneAndPullTierNull: (minecraft_id: string) => Promise<void>;
   findOneByMinecraftIdAndUpdate: (
      originalId: string,
      minecraft_id: string,
      wakzoo_id: string,
      tier: string,
   ) => Promise<void>;
   findOneByMinecraftIdAndUpdatePortfolio: (beforeId: string, afterId: string, season: number) => Promise<void>;
   findOneByMinecraftIdAndUpdateEventNoobProHacker: (minecraft_id: string, episode: number, url: string) => Promise<void>;
}

// Create new todo document
architectSchema.statics.create = function (payload: Exclude<keyof Architect, 'portfolio'>) {
   // this === Model
   const architect = new this(payload);
   // return Promise
   return architect.save();
};

architectSchema.statics.findAll = function () {
   return this.find({});
};

architectSchema.statics.findAllWithoutPortfolio = function () {
   return this.aggregate([
      {
         $project: {
            portfolio: 0,
         },
      },
      {
         $addFields: {
            sortPriority: {
               $switch: {
                  branches: createTierArray().map((item, index) => {
                     return {
                        case: {
                           $eq: [item, { $last: '$tier' }],
                        },
                        then: index + 1,
                     };
                  }),
               },
            },
            lowerId: {
               $toLower: '$minecraft_id',
            },
         },
      },
      {
         $sort: {
            sortPriority: 1,
            lowerId: 1,
         },
      },
   ]);
};

architectSchema.statics.findAllByLineTier = function (tier: string) {
   return this.aggregate([
      {
         $match: { $expr: { $in: [{ $arrayElemAt: ['$tier', 1] }, convertLineTierToTier(tier)] } },
      },
      {
         $addFields: {
            sortPriority: {
               $switch: {
                  branches: createTierArray().map((item, index) => {
                     return {
                        case: {
                           $eq: [item, { $last: '$tier' }],
                        },
                        then: index + 1,
                     };
                  }),
               },
            },
            lowerId: {
               $toLower: '$minecraft_id',
            },
         },
      },
      {
         $sort: {
            sortPriority: 1,
            lowerId: 1,
         },
      },
   ]);
};

architectSchema.statics.findAllByInput = function (input: string) {
   return this.aggregate([
      {
         $match: { minecraft_id: { $regex: fuzzySearchRegExp(input) } },
      },
      {
         $addFields: {
            sortPriority: {
               $switch: {
                  branches: createTierArray().map((item, index) => {
                     return {
                        case: {
                           $eq: [item, { $last: '$tier' }],
                        },
                        then: index + 1,
                     };
                  }),
               },
            },
            lowerId: {
               $toLower: '$minecraft_id',
            },
         },
      },
      {
         $sort: {
            sortPriority: 1,
            lowerId: 1,
         },
      },
   ]);
};

architectSchema.statics.findOneByMinecraftId = function (minecraft_id: string) {
   return this.findOne({ minecraft_id });
};

architectSchema.statics.findOneAndPushToPortfolio = function (
   minecraft_id: string,
   payload: Architect['portfolio']['noobProHacker'][0],
) {
   if (payload.ranking == 1) {
      return this.findOneAndUpdate(
         { minecraft_id },
         {
            $push: { 'portfolio.noobProHacker': payload },
            $inc: { 'noobProHackerInfo.win': 1, 'noobProHackerInfo.participation': 1 },
         },
      );
   } else {
      return this.findOneAndUpdate(
         { minecraft_id },
         {
            $push: { 'portfolio.noobProHacker': payload },
            $inc: { 'noobProHackerInfo.participation': 1 },
         },
      );
   }
};

architectSchema.statics.findAllAndSetTierUnRanked = function () {
   return this.updateMany(
      {},
      {
         $push: {
            tier: '언랭',
         },
      },
   );
};

/** 시즌 선택해야함 */
architectSchema.statics.findOneAndUnSetTierFirstIndex = function (minecraft_id) {
   return this.findOneAndUpdate(
      { minecraft_id },
      {
         $unset: { 'tier.3': 1 },
      },
   );
};

architectSchema.statics.findOneAndPullTierNull = function (minecraft_id) {
   return this.findOneAndUpdate(
      { minecraft_id },
      {
         $pull: { tier: null },
      },
   );
};

architectSchema.statics.findOneAndPushToPlacementTest = function (
   minecraft_id: string,
   payload: Architect['portfolio']['placementTest'][0],
) {
   return this.findOneAndUpdate(
      { minecraft_id },
      {
         $push: { 'portfolio.placementTest': payload, tier: payload.placement_result },
      },
   );
};

architectSchema.statics.findOneAndPushToEventNoobProHacker = function (
   minecraft_id: string,
   payload: Architect['portfolio']['eventNoobProHacker'][0],
) {
   return this.findOneAndUpdate(
      { minecraft_id },
      {
         $push: { 'portfolio.eventNoobProHacker': payload },
      },
   );
};

architectSchema.statics.findOneByMinecraftIdAndUpdate = function (
   originalId: string,
   minecraft_id: string,
   wakzoo_id: string,
   tier: string,
) {
   return this.findOneAndUpdate(
      { minecraft_id: originalId },
      {
         $set: {
            minecraft_id: minecraft_id,
            wakzoo_id: wakzoo_id,
            tier: [tier],
         },
      },
   );
};

architectSchema.statics.findOneByMinecraftIdAndUpdatePortfolio = function (
   beforeId: string,
   afterId: string,
   season: number,
) {
   return this.findOneAndUpdate(
      { minecraft_id: beforeId },
      {
         $set: {
            'portfolio.placementTest.$[elem].image_url': `https://wakcraft.s3.ap-northeast-2.amazonaws.com/placementTest/season ${season.toString()}/${afterId}.png`,
         },
      },
      {
         arrayFilters: [
            {
               'elem.season': season,
            },
         ],
      },
   );
};

architectSchema.statics.findOneByMinecraftIdAndUpdateEventNoobProHacker = function (
   minecraft_id: string,
   episode: number,
   url: string,
) {
   return this.findOneAndUpdate(
      {
         minecraft_id: minecraft_id,
      },
      {
         $set: {
            'portfolio.eventNoobProHacker.$[elem].youtube_url': url,
         },
      },
      {
         arrayFilters: [
            {
               'elem.episode': episode,
            },
         ],
      },
   );
};

const Architect =
   (models['Architect'] as ArchitectModel) || model<Architect, ArchitectModel>('Architect', architectSchema);

export default Architect;
