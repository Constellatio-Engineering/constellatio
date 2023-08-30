module.exports = function (plop) {
  plop.setGenerator('controller', {
    description: 'application controller logic',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'component name please',
      },
      {
        type: 'confirm',
        name: 'hasProps',
        message: 'should the component have props?',
      }
    ],
    actions(data)
    {
      const componentTemplateWithProps = 'src/utils/plop-templates/component-with-props.plop.hbs';
      const componentTemplateWithoutProps = 'src/utils/plop-templates/component-without-props.plop.hbs';

      return data.hasProps ? [
        {
          type: 'add',
          path: 'src/components/{{camelCase name}}/{{pascalCase name}}.styles.ts',
          templateFile: 'src/utils/plop-templates/component.style.plop.hbs',
        },
        {
          type: 'add',
          path: 'src/components/{{camelCase name}}/{{pascalCase name}}.tsx',
          templateFile:  componentTemplateWithProps ,
        },
        {
          type: 'add',
          path: 'src/components/{{camelCase name}}/{{pascalCase name}}.stories.tsx',
          templateFile: 'src/utils/plop-templates/component.stories.plop.hbs',
        },
      ] : [
        {
          type: 'add',
          path: 'src/components/{{camelCase name}}/{{pascalCase name}}.styles.ts',
          templateFile: 'src/utils/plop-templates/component.style.plop.hbs',
        },
        {
          type: 'add',
          path: 'src/components/{{camelCase name}}/{{pascalCase name}}.tsx',
          templateFile: componentTemplateWithoutProps,
        },
      ];
    },
  });
};
