const language = require('@google-cloud/language');

const languageClient = new language.LanguageServiceClient({
  keyFile: './src/Adapters/APIKey.json',
});

export const detectEntities = async (text: string) => {
  let entities;

  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };
  try {
    const [result] = await languageClient.analyzeEntities({
      document: document,
    });
    entities = result?.entities;
    console.log(`Text: ${text}`);
    console.log(`entities: ${JSON.stringify(entities)}`);
    return entities;
  } catch (e) {
    console.log(e);
  }
};
