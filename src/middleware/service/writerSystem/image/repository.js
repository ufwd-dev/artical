'use strict';

const {ImageRepository} = require('sharp-repo');
const {FileStoreAdapter} = require('sharp-repo/src/store/file');

const {config} = require('lemonitor-service');
const fs = require('fs-extra');
const path = require('path');

config.read();

config.setPath('htdocs', config.get('server.htdocs'));

const filePath = config.getPath('htdocs');

fs.ensureDirSync(path.resolve(filePath, 'figureRepo'));

fs.ensureDirSync(path.resolve(filePath, 'thumbnailRepo'));

const imageStore = new FileStoreAdapter({
	root:  `${filePath}/figureRepo`
});

const thumbnailStore = new FileStoreAdapter({
	root: `${filePath}/thumbnailRepo`
});

const imageRepository = new ImageRepository(imageStore);

const common = {
	type: 'png',
	chain: [
		{
			type: 'resize',
			args: [400, 300]
		},
		{
			type: 'max',
			args: []
		}
	]
};

imageRepository.createProfile('common', common);

const thumbnailRepository = new ImageRepository(thumbnailStore);

const huge = {
	type: 'png',
	chain: [
		{
			type: 'resize',
			args: [1280, 720]
		},
		{
			type: 'max',
			args: []
		}
	]
};

const big = {
	type: 'png',
	chain: [
		{
			type: 'resize',
			args: [720, 540]
		},
		{
			type: 'max',
			args: []
		}
	]
};

const medium = {
	type: 'png',
	chain: [
		{
			type: 'resize',
			args: [720, 480]
		},
		{
			type: 'max',
			args: []
		}
	]
};

const small = {
	type: 'png',
	chain: [
		{
			type: 'resize',
			args: [720, 405]
		},
		{
			type: 'max',
			args: []
		}
	]
};

thumbnailRepository.createProfile('huge', huge);
thumbnailRepository.createProfile('big', big);
thumbnailRepository.createProfile('medium', medium);
thumbnailRepository.createProfile('small', small);

module.exports = {imageRepository, thumbnailRepository};