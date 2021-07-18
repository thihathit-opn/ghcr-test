'use strict';

const Util = require('util')
const Path = require('path')
const Fs = require('fs')
const ReadFile = Util.promisify(Fs.readFile)

const Twig = require('twig')
const templateFolder = Path.resolve(__dirname, 'templates');

module.exports = async (file, data) => {
  const templatePath = Path.resolve(templateFolder, file)

  const content = await ReadFile(templatePath, 'utf8')

  if (content) {
    const template = Twig.twig({
      data: '{% spaceless %}' + content + '{% endspaceless %}',
    })

    return template.render(data)
  }

  return null
}