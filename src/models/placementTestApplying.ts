import { Architect } from '@/domain/architect';
import { Schema, Model, model, models } from 'mongoose';

export interface PlacementTestApplying extends Architect {
   cafe_url: string;
   order: number;
}

interface PlacementTestApplyingModel extends Model<PlacementTestApplying> {
   createByArchitect: (payload: PlacementTestApplying) => Promise<void>;
   findAll: () => Promise<PlacementTestApplying[]>;
}

const placementTestApplyingSchema = new Schema({
   minecraft_id: {
      type: String,
   },
   order: { type: Number },
   wakzoo_id: { type: String },
   cafe_url: { type: String },
   curTier: { type: String },
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

// Create new todo document
placementTestApplyingSchema.statics.create = function (payload) {
   // this === Model
   const placementTestApplying = new this(payload);
   // return Promise
   return placementTestApplying.save();
};

placementTestApplyingSchema.statics.findAll = function () {
   return this.find({});
};

const PlacementTestApplying =
   (models['PlacementTestApplying'] as PlacementTestApplyingModel) ||
   model<PlacementTestApplying, PlacementTestApplyingModel>('PlacementTestApplying', placementTestApplyingSchema);

export default PlacementTestApplying;
