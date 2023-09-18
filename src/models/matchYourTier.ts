import { MatchYourTier } from '@/domain/matchYourTier';
import { Schema, Model, model, models } from 'mongoose';

interface MatchYourTierModel extends Model<MatchYourTier> {
   findAll: () => Promise<MatchYourTier[]>;
   findByEpisode: (episode: string) => Promise<MatchYourTier>;
   findLastestOne: () => Promise<MatchYourTier>;
   updateArchitectId: (beforeId: string, afterId: string) => Promise<MatchYourTier>;
   findOneByEpisodeAndUpdate: (payload: MatchYourTier) => Promise<void>;
}

const matchYourTierSchema = new Schema({
   contentInfo: {
      contentName: { type: String },
      episode: { type: Number },
      date: { type: Date, default: Date.now },
      youtube_url: { type: String },
   },
   participants: [
      {
         order: { type: Number },
         expectedTier: { type: String },
         currentTier: { type: String },
         minecraft_id: { type: String },
         image_url: { type: String },
         youtube_url: { type: String },
         ranking: { type: Number },
      },
   ],
});

matchYourTierSchema.statics.create = function (payload) {
   const noobProHacker = new this(payload);
   return noobProHacker.save();
};

matchYourTierSchema.statics.findAll = function () {
   return this.find({});
};

matchYourTierSchema.statics.findByEpisode = function (episode: string) {
   return this.findOne({ 'contentInfo.episode': episode });
};

matchYourTierSchema.statics.findLastestOne = function () {
   return this.find({}).sort({ _id: -1 }).limit(1);
};

matchYourTierSchema.statics.updateArchitectId = function (beforeId: string, afterId: string) {
   return this.updateMany(
      {},
      {
         $set: {
            'participants.$[participant].minecraft_id': afterId,
         },
      },
      {
         arrayFilters: [
            {
               'participant.minecraft_id': {
                  id: beforeId,
               },
            },
         ],
      },
   );
};

matchYourTierSchema.statics.findOneByEpisodeAndUpdate = function (payload: MatchYourTier) {
   return this.updateOne(
      {
         'contentInfo.episode': payload.contentInfo.episode,
      },
      {
         $set: {
            contentInfo: payload.contentInfo,
            participants: payload.participants,
         },
      },
   );
};

const MatchYourTier =
   (models['MatchYourTier'] as MatchYourTierModel) ||
   model<MatchYourTier, MatchYourTierModel>('MatchYourTier', matchYourTierSchema);

export default MatchYourTier;
