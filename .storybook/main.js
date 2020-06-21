module.exports = {
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        // Optional
        {
          loader: require.resolve('react-docgen-typescript-loader'),
          options: {
            shouldExtractLiteralValuesFromEnum: true,
            propFilter: (prop) => {
              if (prop.parent) {
                return !prop.parent.fileName.includes('node_modules')
              }
            }
          }
        },
      ],
    });
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
  stories: ['../src/**/**/*.stories.tsx'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links'
  ]
};