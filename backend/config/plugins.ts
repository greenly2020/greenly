export default ({ env }) => ({
  i18n: false,
  upload: false,
  graphql: {
    config: {
      playgroundAlways: false,
      apolloServer: {
        tracing: false,
      },
    },
  },
});
