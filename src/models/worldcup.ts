import { Worldcup } from '@/domain/worldcup';
import { Model, Schema, model, models } from 'mongoose';

interface WorldcupModel extends Model<Worldcup> {
   findAllBySubject: (payload: Worldcup) => Promise<void>;
}

const worldcupSchema = new Schema<Worldcup, WorldcupModel>({
   subject: { type: String },
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

worldcupSchema.statics.findAllBySubject = function (subject: string) {
   return this.find({ subject: subject });
};

const Worldcup = (models['Worldcup'] as WorldcupModel) || model<Worldcup, WorldcupModel>('WorldCup', worldcupSchema);

export default Worldcup;
