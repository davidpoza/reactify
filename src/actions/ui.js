import types from './types';

export const makeToolbarTransparent = () => ({
  type: types.TRANSPARENT_TOOLBAR,
});

export const makeToolbarOpaque = () => ({
  type: types.OPAQUE_TOOLBAR,
});