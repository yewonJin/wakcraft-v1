import { NoobProHacker } from '@/domain/noobProHacker';
import { Schema, Model, model, models } from 'mongoose';

interface NoobProHackerModel extends Model<NoobProHacker> {
   findAll: () => Promise<NoobProHacker[]>;
   findAllWithoutLineInfo: () => Promise<NoobProHacker[]>;
   findLastestOne: () => Promise<NoobProHacker>;
   findByEpisode: (episode: string) => Promise<NoobProHacker>;
   updateArchitectId: (beforeId: string, afterId: string, tier: string) => Promise<NoobProHacker[]>;
   findHackerInfo: () => Promise<NoobProHacker[]>;
   findAllWinLine: () => Promise<NoobProHacker[]>;
}

const noobProHackerSchema = new Schema({
   contentInfo: {
      episode: { type: Number, required: true, unique: true },
      main_subject: { type: String },
      date: { type: Date, default: Date.now },
      youtube_url: { type: String },
   },
   lineInfo: [
      {
         subject: { type: String, required: true },
         youtube_url: { type: String, required: true },
         line_ranking: { type: Number, default: 0 },
         line_details: {
            noob: {
               minecraft_id: { type: String, required: true },
               image_url: { type: String, required: true },
               youtube_url: { type: String, required: true },
               ranking: { type: Number, default: 0 },
            },
            pro: {
               minecraft_id: { type: String, required: true },
               image_url: { type: String, required: true },
               youtube_url: { type: String, required: true },
               ranking: { type: Number, required: true },
            },
            hacker: {
               minecraft_id: { type: String, required: true },
               image_url: { type: String, required: true },
               youtube_url: { type: String, required: true },
               ranking: { type: Number, required: true },
            },
         },
      },
   ],
});

noobProHackerSchema.statics.create = function (payload) {
   const noobProHacker = new this(payload);
   return noobProHacker.save();
};

noobProHackerSchema.statics.findByEpisode = function (episode: string) {
   return this.findOne({ 'contentInfo.episode': episode });
};

noobProHackerSchema.statics.findAll = function () {
   return this.find({}, { $sort: { 'contentInfo.episode': 1 } });
};

noobProHackerSchema.statics.findLastestOne = function () {
   return this.find({}).sort({ 'contentInfo.episode': -1 }).limit(1);
};

noobProHackerSchema.statics.findAllWithoutLineInfo = function () {
   return this.aggregate([
      {
         $project: {
            contentInfo: 1,
            winnerLine: {
               $filter: {
                  input: '$lineInfo',
                  as: 'line',
                  cond: { $eq: ['$$line.line_ranking', 1] },
               },
            },
            winner: {
               $filter: {
                  input: '$lineInfo',
                  as: 'line',
                  cond: { $eq: ['$$line.line_details.hacker.ranking', 1] },
               },
            },
         },
      },
      {
         $sort: { 'contentInfo.episode': 1 },
      },
   ]);
};

noobProHackerSchema.statics.updateArchitectId = function (beforeId: string, afterId: string, tier: string) {
   return this.updateMany(
      {
         lineInfo: {
            $elemMatch: {
               [`line_details.${tier}.minecraft_id`]: beforeId,
            },
         },
      },
      {
         $set: {
            [`lineInfo.$.line_details.${tier}.minecraft_id`]: afterId,
         },
      },
   );
};

noobProHackerSchema.statics.findHackerInfo = function () {
   return this.aggregate([
      {
         $project: {
            contentInfo: {
               episode: 1,
            },
            lineInfo: {
               subject: 1,
               'line_details.hacker': 1,
            },
         },
      },
   ]);
};

noobProHackerSchema.statics.findAllWinLine = function () {
   return this.aggregate([
      {
         $match: {
            lineInfo: {
               $elemMatch: {
                  $and: [
                     {
                        'line_details.pro.ranking': 1,
                     },
                     {
                        'line_details.hacker.ranking': 1,
                     },
                     {
                        line_ranking: 1,
                     },
                  ],
               },
            },
         },
      },
   ]);
};

const NoobProHacker =
   (models['NoobProHacker'] as NoobProHackerModel) ||
   model<NoobProHacker, NoobProHackerModel>('NoobProHacker', noobProHackerSchema);

export default NoobProHacker;
