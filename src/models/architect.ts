import { Schema, Model, model, models } from 'mongoose';
import { fuzzySearchRegExp } from '@/utils/fuzzySearch';
import { Architect } from '@/domain/architect';
import { convertLineTierToTier } from '@/controller/architect';

interface ArchitectModel extends Model<Architect> {
   findAll: () => Promise<Architect[]>;
   findAllWithoutPortfolio: () => Promise<Exclude<Architect[], 'portfolio'>>;
   findAllByLineTier: (tier: string) => Promise<Architect[]>;
   findAllByInput: (input: string) => Promise<Architect[]>;
   findOneByMinecraftId: (minecraft_id: string) => Promise<Architect[]>;
   findOneAndPushToPortfolio: (minecraft_id: string, payload: Architect) => Promise<void>;
}

// Define Schemes
const architectSchema = new Schema<Architect>({
   minecraft_id: {
      type: String,
      required: true,
      unique: true,
   },
   wakzoo_id: { type: String },
   tier: { type: [String] },
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
      placement_test: [
         {
            episode: { type: Number },
            subject: { type: String },
            image_url: { type: String },
            placement_result: { type: String },
         },
      ],
   },
});

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
   return this.find({}, { portfolio: false });
};

architectSchema.statics.findAllByLineTier = function (tier: string) {
   return this.find().in('tier', convertLineTierToTier(tier));
};

architectSchema.statics.findAllByInput = function (input: string) {
   return this.find({ minecraft_id: { $regex: fuzzySearchRegExp(input) } });
};

architectSchema.statics.findOneByMinecraftId = function (minecraft_id: string) {
   return this.findOne({ minecraft_id });
};

architectSchema.statics.findOneAndPushToPortfolio = function (minecraft_id: string, payload) {
   return this.findOneAndUpdate(
      { minecraft_id },
      {
         $push: { 'portfolio.noobProHacker': payload },
      },
   );
};

const Architect =
   (models['Architect'] as ArchitectModel) || model<Architect, ArchitectModel>('Architect', architectSchema);

export default Architect;
