import { defineArrayMember, defineField, defineType } from 'sanity';

const richText = defineType({
  name: 'richText', title: 'Rich text', type: 'object',
  fields: [defineField({ name: 'content', type: 'array', validation: (rule) => rule.required(),
    of: [defineArrayMember({ type: 'block',
      styles: [{title: 'Normal', value: 'normal'}, {title: 'Heading', value: 'h2'}, {title: 'Subheading', value: 'h3'}],
      lists: [{title: 'Bullet', value: 'bullet'}, {title: 'Number', value: 'number'}],
      marks: {
        decorators: [{title: 'Strong', value: 'strong'}, {title: 'Emphasis', value: 'em'}],
        annotations: [{name: 'link', type: 'object', title: 'Link', fields: [{name: 'href', type: 'url', validation: (rule) => rule.required().uri({allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel']})]}],
      },
    })],
  })],
  preview: { prepare: () => ({ title: 'Rich text' }) },
});

const imageBlock = defineType({
  name: 'imageBlock', title: 'Image', type: 'image', options: {hotspot: true},
  validation: (rule) => rule.required().assetRequired(),
  fields: [
    defineField({name: 'alt', title: 'Alternative text', type: 'string', validation: (rule) => rule.required(), description: 'Describe the image for someone who cannot see it.'}),
    defineField({name: 'caption', type: 'string'}),
  ],
});

const accordion = defineType({
  name: 'accordion', title: 'Accordion', type: 'object',
  fields: [
    defineField({name: 'title', type: 'string'}),
    defineField({name: 'items', type: 'array', validation: (rule) => rule.required().min(1), of: [defineArrayMember({
      name: 'accordionItem', title: 'Item', type: 'object', fields: [
        defineField({name: 'heading', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'content', type: 'text', validation: (rule) => rule.required()}),
      ], preview: {select: {title: 'heading'}},
    })]}),
  ],
});

const page = defineType({
  name: 'page', title: 'Page', type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'slug', type: 'slug', options: {source: 'title'}, description: 'Use home for /. Use about or services/example for other pages. studio is reserved.', validation: (rule) => rule.required().custom((value) => {
      const slug = value?.current;
      if (!slug) return 'A slug is required.';
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/.test(slug)) return 'Use lowercase URL segments separated by /, without leading or trailing slashes.';
      if (slug === 'studio' || slug.startsWith('studio/')) return 'studio is reserved.';
      return true;
    })}),
    defineField({name: 'description', type: 'text', rows: 3}),
    defineField({name: 'blocks', type: 'array', validation: (rule) => rule.required(), of: [
      defineArrayMember({type: 'richText'}), defineArrayMember({type: 'imageBlock'}), defineArrayMember({type: 'accordion'}),
    ]}),
  ],
  preview: {select: {title: 'title', subtitle: 'slug.current'}},
});

export const schemaTypes = [page, richText, imageBlock, accordion];
