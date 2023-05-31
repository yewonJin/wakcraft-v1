import { EventNoobProHacker } from '@/domain/eventNoobProHacker';
import { Schema, Model, model, models } from 'mongoose';

interface EventNoobProHackerModel extends Model<EventNoobProHacker> {
   findAll: () => Promise<EventNoobProHacker[]>;
   findAllWithoutLineInfo: () => Promise<EventNoobProHacker[]>;
   findByEpisode: (episode: string) => Promise<EventNoobProHacker>;
   findLastestOne: () => Promise<EventNoobProHacker>;
   updateArchitectId: (beforeId: string, afterId: string) => Promise<EventNoobProHacker>;
}

const eventNoobProHackerSchema = new Schema({
   contentInfo: {
      contentName: { type: String, required: true },
      episode: { type: Number },
      date: { type: Date, default: Date.now },
      youtube_url: { type: String },
   },
   lineInfo: [
      {
         subject: { type: String, required: true },
         youtube_url: { type: String, required: true },
         line_ranking: { type: Number, default: 0 },
         line_details: [
            {
               line: { type: String },
               minecraft_id: [{ type: String }],
               image_url: { type: String },
               youtube_url: { type: String },
               ranking: { type: Number },
            },
         ],
      },
   ],
});

eventNoobProHackerSchema.statics.create = function (payload) {
   const noobProHacker = new this(payload);
   return noobProHacker.save();
};

eventNoobProHackerSchema.statics.findAll = function () {
   return this.find({});
};

eventNoobProHackerSchema.statics.findByEpisode = function (episode: string) {
   return this.findOne({ 'contentInfo.episode': episode });
};

eventNoobProHackerSchema.statics.findAllWithoutLineInfo = function () {
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
   ]);
};

eventNoobProHackerSchema.statics.findLastestOne = function () {
   return this.find({}).sort({ _id: -1 }).limit(1);
};

eventNoobProHackerSchema.statics.updateArchitectId = function (beforeId: string, afterId: string) {
   return this.updateMany(
      {},
      {
         $set: {
            'lineInfo.$[line].line_details.$[detail].minecraft_id': afterId,
         },
      },
      {
         arrayFilters: [
            {
               'line.line_details': {
                  $exists: true,
               },
            },
            {
               'detail.minecraft_id': beforeId,
            },
         ],
      },
   );
};

const EventNoobProHacker =
   (models['EventNoobProHacker'] as EventNoobProHackerModel) ||
   model<EventNoobProHacker, EventNoobProHackerModel>('EventNoobProHacker', eventNoobProHackerSchema);

export default EventNoobProHacker;
