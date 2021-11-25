import mongoose from 'mongoose';

const dbConnect = async (): Promise<any> => {
  try {
    await mongoose.connect(
      process.env.MONGO_URL ||
        'mongodb://127.0.0.1:27017/shop?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
    );

    return mongoose
      .createConnection(
        process.env.MONGO_URL ||
          'mongodb://127.0.0.1:27017/shop?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
      )
      .asPromise()
      .then((client) => client.getClient());
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;
