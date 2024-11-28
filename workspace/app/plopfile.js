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
      },
      {
        type: 'confirm',
        name: 'hasStorybook',
        message: 'should the component have storybook file?',
        when: (answers) => answers.hasProps,
      }
    ],
    actions(data)
    {
      const componentTemplateWithProps = 'src/utils/plop-templates/component-with-props.plop.hbs';
      const componentTemplateWithoutProps = 'src/utils/plop-templates/component-without-props.plop.hbs';

      const actions = [
        {
          type: 'add',
          path: 'src/components/{{camelCase name}}/{{pascalCase name}}.styles.ts',
          templateFile: 'src/utils/plop-templates/component.style.plop.hbs',
        },
        {
          type: 'add',
          path: 'src/components/{{camelCase name}}/{{pascalCase name}}.tsx',
          templateFile: data.hasProps ? componentTemplateWithProps : componentTemplateWithoutProps,
        },
      ];

      if (data.hasProps && data.hasStorybook) {
        actions.push({
          type: 'add',
          path: 'src/components/{{camelCase name}}/{{pascalCase name}}.stories.tsx',
          templateFile: 'src/utils/plop-templates/component.stories.plop.hbs',
        });
      }
      return actions;
    },
  });
};
