/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { Story, StoryRef } from './Story';

// @ts-expect-error
const story: Story = {};

const storyRef: StoryRef = story;

console.log(storyRef);
