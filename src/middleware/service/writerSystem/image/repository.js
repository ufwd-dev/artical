'use strict';

const path = require('path');
const {ImageRepository} = require('sharp-repo');
const {FileStoreAdapter} = require('sharp-repo/src/store/file');

const imageStore = new FileStoreAdapter({
	root: path.resolve(__dirname, '../../../../figureRepo')
});

const thumbnailStore = new FileStoreAdapter({
	root: path.resolve(__dirname, '../../../../thumbnailRepo')
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