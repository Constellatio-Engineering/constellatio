const sleep = async (ms) => new Promise(resolve => setTimeout(resolve, ms));

const test = async () =>
{
  for(let i = 0; i < 100; i++)
  {
    console.log("i: ", i);

    if(i % 10 === 0)
    {
      console.log("Pause");

      await sleep(3000);
    }
  }
}

test()
  .then(() => console.log("done"))
  .catch(e => console.error("error: ", e));
