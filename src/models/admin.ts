import { Model, Schema, model, models } from 'mongoose';
import bcrypt from 'bcrypt';

interface Admin {
   username: string;
   hashedPassword: string;
}

interface AdminMethods {
   setPassword: (password: string) => Promise<void>;
   checkPassword: (password: string) => Promise<boolean>;
}

interface AdminModel extends Model<Admin, {}, AdminMethods> {
   findByUsername: (useranme: string) => Promise<Admin & AdminMethods>;
}

const adminSchema = new Schema<Admin, AdminModel, AdminMethods>({
   username: { type: String, required: true },
   hashedPassword: { type: String, required: true },
});

adminSchema.methods.setPassword = async function (password: string) {
   const hash = await bcrypt.hash(password, 10);
   this.hashedPassword = hash;
};

adminSchema.methods.checkPassword = async function (password: string) {
   const result = await bcrypt.compare(password, this.hashedPassword);
   return result; // true / false
};

adminSchema.statics.findByUsername = function (username: string) {
   return this.findOne({ username });
};

const Admin = (models['Admin'] as AdminModel) || model<Admin, AdminModel>('Admin', adminSchema);

export default Admin;
