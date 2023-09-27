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
   curTier: { type: String },
   noobProHackerInfo: {
      win: { type: Number, default: 0 },
      hackerWin: { type: Number, default: 0 },
      proWin: { type: Number, default: 0 },
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
            date: { type: Date },
         },
      ],
      placementTest: [
         {
            season: { type: Number },
            image_url: { type: String },
            placement_result: { type: String },
            date: { type: Date },
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
            date: { type: Date },
         },
      ],
      architectureContest: [
         {
            contentName: { type: String, required: true },
            episode: { type: Number, required: true },
            subject: { type: String, required: true },
            line: { type: String, required: true },
            image_url: { type: String, required: true },
            youtube_url: { type: String, required: true },
            ranking: { type: Number, default: 0 },
            date: { type: Date },
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
   findAllAndSetCurTierUnRanked: () => Promise<void>;
   findOneAndPushToPlacementTest: (
      minecraft_id: string,
      payload: Architect['portfolio']['placementTest'][0],
   ) => Promise<void>;
   findOneAndPushToEventNoobProHacker: (
      minecraft_id: string,
      payload: Architect['portfolio']['eventNoobProHacker'][0],
   ) => Promise<void>;
   findOneAndPushToArchitectureContest: (
      minecraft_id: string,
      payload: Architect['portfolio']['architectureContest'][0],
   ) => Promise<void>;
   findOneAndUnSetTierFirstIndex: (minecraft_id: string) => Promise<void>;
   findOneAndPullTierNull: (minecraft_id: string) => Promise<void>;
   findOneByMinecraftIdAndUpdate: (
      originalId: string,
      minecraft_id: string,
      wakzoo_id: string,
      tier: string,
   ) => Promise<void>;
   findOneByMinecraftIdAndUpdateCurTier: (minecraft_id: string, tier: string) => Promise<void>;
   findOneByMinecraftIdAndUpdatePortfolio: (
      beforeId: string,
      afterId: string,
      season: number,
      date: Date,
   ) => Promise<void>;
   findOneByMinecraftIdAndUpdatePlacementTest: (minecraft_id: string, season: number, date: Date) => Promise<void>;
   findOneByMinecraftIdAndUpdateEventNoobProHacker: (
      minecraft_id: string,
      episode: number,
      url: string,
      date: Date,
   ) => Promise<void>;
   findOneByMinecraftIdAndUpdateNoobProHacker: (
      minecraft_id: string,
      episode: number,
      url: string,
      date: Date,
   ) => Promise<void>;
   findOneByMinecraftIdAndUpdateArchitectureContest: (
      minecraft_id: string,
      episode: number,
      url: string,
      date: Date,
   ) => Promise<void>;
   updateNumberOfParticipation: (minecraft_id: string, number: number) => Promise<Architect>;
   updateNumberOfWin: (minecraft_id: string, number: number) => Promise<Architect>;
   updateNumberOfHackerWin: (minecraft_id: string, number: number) => Promise<Architect>;
   updateNumberOfProWin: (minecraft_id: string, number: number) => Promise<Architect>;
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
                           item: 'curTier',
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

architectSchema.statics.updateNumberOfParticipation = function (minecraft_id: string, number: number) {
   return this.findOneAndUpdate(
      { minecraft_id },
      {
         $set: { 'noobProHackerInfo.participation': number },
      },
   );
};

architectSchema.statics.updateNumberOfWin = function (minecraft_id: string, number: number) {
   return this.findOneAndUpdate(
      { minecraft_id },
      {
         $set: { 'noobProHackerInfo.win': number },
      },
   );
};

architectSchema.statics.updateNumberOfHackerWin = function (minecraft_id: string, number: number) {
   return this.findOneAndUpdate(
      { minecraft_id },
      {
         $set: { 'noobProHackerInfo.hackerWin': number },
      },
   );
};

architectSchema.statics.updateNumberOfProWin = function (minecraft_id: string, number: number) {
   return this.findOneAndUpdate(
      { minecraft_id },
      {
         $set: { 'noobProHackerInfo.proWin': number },
      },
   );
};

architectSchema.statics.findOneAndPushToPortfolio = function (
   minecraft_id: string,
   payload: Architect['portfolio']['noobProHacker'][0],
) {
   if (payload.ranking == 1) {
      if (payload.line === 'hacker') {
         return this.findOneAndUpdate(
            { minecraft_id },
            {
               $push: { 'portfolio.noobProHacker': payload },
               $inc: {
                  'noobProHackerInfo.win': 1,
                  'noobProHackerInfo.hackerWin': 1,
                  'noobProHackerInfo.participation': 1,
               },
            },
         );
      } else if (payload.line === 'pro') {
         return this.findOneAndUpdate(
            { minecraft_id },
            {
               $push: { 'portfolio.noobProHacker': payload },
               $inc: {
                  'noobProHackerInfo.win': 1,
                  'noobProHackerInfo.proWin': 1,
                  'noobProHackerInfo.participation': 1,
               },
            },
         );
      }
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

architectSchema.statics.findAllAndSetCurTierUnRanked = function () {
   return this.updateMany(
      {},
      {
         $set: {
            curTier: '언랭',
         },
      },
   );
};

/** 시즌 선택해야함 */
architectSchema.statics.findOneAndUnSetTierFirstIndex = function (minecraft_id: string) {
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
         $inc: { 'noobProHackerInfo.participation': 1 },
      },
   );
};

architectSchema.statics.findOneAndPushToEventNoobProHacker = function (
   minecraft_id: string,
   payload: Architect['portfolio']['eventNoobProHacker'][0],
) {
   if (payload.ranking == 1) {
      return this.findOneAndUpdate(
         { minecraft_id },
         {
            $push: { 'portfolio.eventNoobProHacker': payload },
            $inc: { 'noobProHackerInfo.win': 1, 'noobProHackerInfo.participation': 1 },
         },
      );
   } else {
      return this.findOneAndUpdate(
         { minecraft_id },
         {
            $push: { 'portfolio.eventNoobProHacker': payload },
            $inc: { 'noobProHackerInfo.participation': 1 },
         },
      );
   }
};

architectSchema.statics.findOneAndPushToArchitectureContest = function (
   minecraft_id: string,
   payload: Architect['portfolio']['architectureContest'][0],
) {
   if (payload.ranking == 1) {
      return this.findOneAndUpdate(
         { minecraft_id },
         {
            $push: { 'portfolio.architectureContest': payload },
            $inc: { 'noobProHackerInfo.win': 1, 'noobProHackerInfo.participation': 1 },
         },
      );
   } else {
      return this.findOneAndUpdate(
         { minecraft_id },
         {
            $push: { 'portfolio.architectureContest': payload },
            $inc: { 'noobProHackerInfo.participation': 1 },
         },
      );
   }
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
            curTier: tier,
         },
      },
   );
};

architectSchema.statics.findOneByMinecraftIdAndUpdateCurTier = function (minecraft_id: string, tier: string) {
   return this.findOneAndUpdate(
      { minecraft_id },
      {
         $set: {
            curTier: tier,
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
   date: Date,
) {
   return this.findOneAndUpdate(
      {
         minecraft_id: minecraft_id,
      },
      {
         $set: {
            'portfolio.eventNoobProHacker.$[elem].youtube_url': url,
            'portfolio.eventNoobProHacker.$[elem].date': date,
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

architectSchema.statics.findOneByMinecraftIdAndUpdatePlacementTest = function (
   minecraft_id: string,
   season: number,
   date: Date,
) {
   return this.findOneAndUpdate(
      {
         minecraft_id: minecraft_id,
      },
      {
         $set: {
            'portfolio.placementTest.$[elem].date': date,
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

architectSchema.statics.findOneByMinecraftIdAndUpdateNoobProHacker = function (
   minecraft_id: string,
   episode: number,
   url: string,
   date: Date,
) {
   return this.findOneAndUpdate(
      {
         minecraft_id: minecraft_id,
      },
      {
         $set: {
            'portfolio.noobProHacker.$[elem].youtube_url': url,
            'portfolio.noobProHacker.$[elem].date': date,
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

architectSchema.statics.findOneByMinecraftIdAndUpdateArchitectureContest = function (
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
            'portfolio.architectureContest.$[elem].youtube_url': url,
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
