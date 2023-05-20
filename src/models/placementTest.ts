import { PlacementTest } from '@/domain/placementTest';
import { Schema, Model, model, models } from 'mongoose';

interface PlacementTestModel extends Model<PlacementTest> {
   findAll: () => Promise<PlacementTest[]>;
   findAllWithoutParticipants: () => Promise<Omit<PlacementTest[], 'participants'>>;
   findBySeason: (season: string) => Promise<PlacementTest>;
}

const placementTestSchema = new Schema({
   season: Number,
   date: String,
   youtube_url: String,
   participants: [
      {
         minecraft_id: String,
         image_url: String,
         placement_result: String,
      },
   ],
});

placementTestSchema.statics.create = function (payload) {
   const placementTest = new this(payload);
   return placementTest.save();
};

placementTestSchema.statics.findAll = function () {
   return this.find({});
};

placementTestSchema.statics.findBySeason = function (season: string) {
   return this.findOne({ season: season });
};

placementTestSchema.statics.findAllWithoutParticipants = function () {
   return this.aggregate([
      {
         $project: {
            participants: 0,
         },
      },
      { 
         $sort: {
            season: 1,
         }
      }
   ]);
};

const PlacementTest =
   (models['PlacementTest'] as PlacementTestModel) ||
   model<PlacementTest, PlacementTestModel>('PlacementTest', placementTestSchema);

export default PlacementTest;
