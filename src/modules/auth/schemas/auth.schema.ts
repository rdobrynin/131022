import { Document } from 'mongoose';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Auth extends Document {
  @Prop({ required: true })
  ping: string;

  @Prop({ required: true })
  ip: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);

export const AuthModel = <ModelDefinition>{
  name: Auth.name,
  schema: AuthSchema,
};
