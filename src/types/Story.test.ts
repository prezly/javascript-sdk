import { describe, expect, it } from 'vitest';

import type { Story, StoryRef } from './Story';

describe('StoryRef', () => {
    it('should be subset of Story interface', () => {
        // @ts-expect-error
        const story: Story = {};

        const storyRef: StoryRef = story; // this is the actual test

        expect(storyRef).toBe(story);
    });
});
