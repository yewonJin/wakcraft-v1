import { PlacementTest } from '@/domain/placementTest';
import { Schema, Model, model, models } from 'mongoose';

export interface PlacementTestWithNumberOfParticipants extends Omit<PlacementTest, 'participants'> {
   numberOfParticipants: number;
}

interface PlacementTestModel extends Model<PlacementTest> {
   findAll: () => Promise<PlacementTest[]>;
   findAllWithoutParticipants: () => Promise<PlacementTestWithNumberOfParticipants[]>;
   findBySeason: (season: string) => Promise<PlacementTest>;
   findByArchitectId: (id: string) => Promise<PlacementTest[]>;
   updateArchitectId: (season: number, beforeId: string, afterId: string) => Promise<PlacementTest>;
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
         cafe_url: String,
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
         $addFields: {
            numberOfParticipants: { $size: '$participants' },
         },
      },
      {
         $project: {
            participants: 0,
         },
      },
      {
         $sort: {
            season: 1,
         },
      },
   ]);
};

placementTestSchema.statics.findByArchitectId = function (id: string) {
   return this.find({
      participants: {
         $elemMatch: {
            minecraft_id: id,
         },
      },
   });
};

placementTestSchema.statics.updateArchitectId = function (season: number, beforeId: string, afterId: string) {
   return this.updateOne(
      {
         season: season,
         participants: {
            $elemMatch: {
               minecraft_id: beforeId,
            },
         },
      },
      {
         $set: {
            'participants.$.minecraft_id': afterId,
            'participants.$.image_url': `https://wakcraft.s3.ap-northeast-2.amazonaws.com/placementTest/season ${season}/${afterId}.png`,
         },
      },
   );
};

const PlacementTest =
   (models['PlacementTest'] as PlacementTestModel) ||
   model<PlacementTest, PlacementTestModel>('PlacementTest', placementTestSchema);

export default PlacementTest;
