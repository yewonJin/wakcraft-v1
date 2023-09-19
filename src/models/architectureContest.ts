import { ArchitectureContest } from '@/domain/architectureContest';
import { Schema, Model, model, models } from 'mongoose';

interface ArchitectureContestModel extends Model<ArchitectureContest> {
   findAll: () => Promise<ArchitectureContest[]>;
   findAllWithoutLineInfo: () => Promise<ArchitectureContest[]>;
   findByEpisode: (episode: string) => Promise<ArchitectureContest>;
   findLastestOne: () => Promise<ArchitectureContest>;
   updateArchitectId: (beforeId: string, afterId: string) => Promise<ArchitectureContest>;
   findOneByEpisodeAndUpdate: (payload: ArchitectureContest) => Promise<void>;
}

const architectureContestSchema = new Schema({
   contentInfo: {
      subject: { type: String },
      episode: { type: Number },
      date: { type: Date, default: Date.now },
      youtube_url: { type: String },
   },
   lineInfo: [
      {
         line: { type: String },
         youtube_url: { type: String, required: true },
         line_details: [
            {
               topText: { type: String },
               bottomText: { type: String },
               line: { type: String },
               minecraft_id: { type: String },
               image_url: { type: String },
               youtube_url: { type: String },
               ranking: { type: Number },
            },
         ],
      },
   ],
});

architectureContestSchema.statics.create = function (payload) {
   const noobProHacker = new this(payload);
   return noobProHacker.save();
};

architectureContestSchema.statics.findAll = function () {
   return this.find({});
};

architectureContestSchema.statics.findByEpisode = function (episode: string) {
   return this.findOne({ 'contentInfo.episode': episode });
};

architectureContestSchema.statics.findAllWithoutLineInfo = function () {
   return this.aggregate([
      {
         $project: {
            contentInfo: 1,
         },
      },
   ]);
};

architectureContestSchema.statics.findLastestOne = function () {
   return this.find({}).sort({ _id: -1 }).limit(1);
};

architectureContestSchema.statics.updateArchitectId = function (beforeId: string, afterId: string) {
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
               'detail.minecraft_id': beforeId,
            },
         ],
      },
   );
};

architectureContestSchema.statics.findOneByEpisodeAndUpdate = function (payload: ArchitectureContest) {
   return this.updateOne(
      {
         'contentInfo.episode': payload.contentInfo.episode,
      },
      {
         $set: {
            contentInfo: payload.contentInfo,
            lineInfo: payload.lineInfo,
         },
      },
   );
};

const ArchitectureContest =
   (models['ArchitectureContest'] as ArchitectureContestModel) ||
   model<ArchitectureContest, ArchitectureContestModel>('ArchitectureContest', architectureContestSchema);

export default ArchitectureContest;
