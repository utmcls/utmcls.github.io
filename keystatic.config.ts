import { config, collection, singleton, fields } from '@keystatic/core';

// Local dev: kind 'local' (files on disk). Production build: GitHub storage.
// In the browser, `process` is usually undefined, so rely on Vite's PROD flag first.
const isProd = import.meta.env?.PROD ?? process.env.VERCEL === '1';

export default config({
  ui: {
    navigation: {
    'Landing Page' : [
      'hero',
      'events',
      'cta',
      'team',
      'footer',
    ],
    },
  },
  storage: isProd
    ? {
        kind: 'github',
        repo: {
          owner: 'utmcls',
          name: 'utmcls.github.io',
        },
      }
    : { kind: 'local' },
  collections: {
    events: collection({
      label: 'Events',
      slugField: 'title',
      path: 'content/events/*/',
      columns: ['title', 'datetime', 'endDatetime', 'type'],
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        datetime: fields.datetime({ label: 'Date & time', description: 'When the event starts' }),
        endDatetime: fields.datetime({
          label: 'End date & time',
          description: 'When the event ends (optional)',
          validation: { isRequired: false },
        }),
        details: fields.text({ label: 'Details (e.g. location or speaker)', multiline: true }),
        type: fields.text({ label: 'Type', description: 'e.g. Workshop, Lecture, Hackathon' }),
        registerUrl: fields.url({ label: 'Link URL' }),
        linkLabel: fields.text({ label: 'Link display text', description: 'Text shown on the button (e.g. Register, Sign up)', defaultValue: 'Link' }),
      },
    }),
    team: collection({
      label: 'Team',
      slugField: 'name',
      path: 'content/team/*/',
      columns: ['name', 'role', 'image'],
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        role: fields.text({ label: 'Role' }),
        description: fields.text({ label: 'Description', multiline: true }),
        image: fields.image({
          label: 'Photo',
          directory: 'public/team',
          publicPath: '/team/',
        }),
        linkedin: fields.url({ label: 'LinkedIn URL' }),
        email: fields.text({ label: 'Email' }),
      },
    }),
  },
  singletons: {
    hero: singleton({
      label: 'Hero',
      path: 'content/hero/',
      schema: {
        statusLabel: fields.text({ label: 'Status label', defaultValue: 'Applications Open' }),
        statusDot: fields.checkbox({ label: 'Show green status dot', defaultValue: true }),
        primaryButtonLabel: fields.text({ label: 'Primary button label', defaultValue: 'Become a Member' }),
        primaryButtonUrl: fields.url({ label: 'Primary button URL' }),
        secondaryButtonLabel: fields.text({ label: 'Secondary button label', defaultValue: 'View Upcoming Events' }),
        secondaryButtonUrl: fields.url({ label: 'Secondary button URL' }),
      },
    }),
    cta: singleton({
      label: 'Ready to get involved?',
      path: 'content/cta/',
      format: { contentField: 'body' },
      schema: {
        body: fields.markdoc({ label: 'Call to action text' }),
        buttonLabel: fields.text({ label: 'Button label', defaultValue: 'Our Links' }),
        buttonUrl: fields.url({ label: 'Button URL' }),
      },
    }),
    footer: singleton({
      label: 'Footer',
      path: 'content/site/',
      schema: {
        tagline: fields.text({
          label: 'Tagline',
          defaultValue: 'UTM Computational Linguistics Society. Run by students, for students.',
          multiline: true,
        }),
        resourceLinks: fields.array(
          fields.object({
            label: fields.text({ label: 'Label' }),
            href: fields.text({ label: 'Href' }),
          }),
          { label: 'Resources (e.g. datasets, papers, slides)', itemLabel: (props) => (props as { label?: string })?.label ?? 'Resource' }
        ),
      },
    }),
  },
});
