import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    toJSON: {
      // Note: Ideally, view related code should be separated from the model
      transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  },
})
class TicketClass {
  @prop()
  public title: string;

  @prop()
  public price: number;

  @prop()
  public userId: string;
}

const Ticket = getModelForClass(TicketClass);

export { Ticket };
