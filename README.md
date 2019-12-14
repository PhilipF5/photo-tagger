# Photo Tagger

Photo Tagger is a desktop app designed to make it easy to apply XMP sidecar tags to varied collections of photos.

## Why?

With all the comprehensive photo organization apps out there, it's worth asking what the point of this app is. Most apps that allow photo tagging use the same basic UX pattern: you select one or more photos, and then choose tags to apply to them. This allows two approaches:

1. Select/open each individual photo, and select all the tags to apply to that photo.
2. Cmd-click a bunch of photos that all require the same tags, and then select all the tags to apply to the subset.

In my opinion, this pattern is hard to use when working with large collections of photos that require many different combinations of tags to be applied to different groups of photos that may not be adjacent in the collection. Option 1 is extremely slow and tedious, with lots of repetitive clicking on tags. Option 2 is highly error-prone when working with large sets, as any mishap with the keyboard or cursor could interrupt your selection and require you to start over.

Rather than an image-first workflow, Photo Tagger uses a tag-first workflow. You select the tags you want to apply, and then you click on each individual photo the tags should be applied to. The tags are saved immediately so you don't risk losing work, and your tag selection is persisted. Think of it as being able to "paint" photos with the currently selected set of tags. Since the app is all about tagging, each photo always has all applied tags listed under the thumbnail for maximum visibility.

## What?

Photo Tagger is an Electron app. The UI is built in React using function components and Hooks.

## How?

An executable download is not provided at this time. You can run the app straight from the cloned source code.

```sh
$ npm ci
$ npm start
```
