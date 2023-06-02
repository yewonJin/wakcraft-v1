import { Game, Worldcup } from '@/domain/worldcup';
import { Model, Schema, model, models } from 'mongoose';

interface WorldcupModel extends Model<Worldcup> {
   findAllByGameName: (game: Game) => Promise<Worldcup[]>;
   increaseNumberOfWin: (subject: string) => Promise<void>;
   increaseNumberOfParticipation: (subject: string) => Promise<void>;
}

const worldcupSchema = new Schema<Worldcup, WorldcupModel>({
   game: { type: String },
   workInfo: {
      minecraft_id: { type: String },
      episode: { type: Number },
      subject: { type: String },
      image_url: { type: String },
      youtube_url: { type: String },
   },
   numberOfWin: { type: Number },
   numberOfParticipation: { type: Number },
});

worldcupSchema.statics.create = function (payload) {
   const worldcup = new this(payload);
   return worldcup.save();
};

worldcupSchema.statics.findAllByGameName = function (game: Game) {
   return this.find({ game: game }).sort({ 'workInfo.episode': -1 }).limit(128);
};

worldcupSchema.statics.increaseNumberOfWin = function (subject: string) {
   return this.updateOne(
      { 'workInfo.subject': subject },
      {
         $inc: { numberOfWin: 1 },
      },
   );
};

worldcupSchema.statics.increaseNumberOfParticipation = function (subject: string) {
   return this.updateOne(
      { 'workInfo.subject': subject },
      {
         $inc: { numberOfParticipation: 1 },
      },
   );
};

const Worldcup = (models['Worldcup'] as WorldcupModel) || model<Worldcup, WorldcupModel>('Worldcup', worldcupSchema);

export default Worldcup;
