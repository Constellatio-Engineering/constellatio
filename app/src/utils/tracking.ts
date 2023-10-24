export async function track(data) {
    const { userId, event } = data;
    const dataToInsert = {
      userId,
      ...event,
    };
    /* console.log(dataToInsert); */
    //await db.insert(tracking).values(dataToInsert);
  }