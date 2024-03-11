import { Preferences } from '@capacitor/preferences';

export const storage = {
    migrate: async () => {
        const { value } = await Preferences.get({ key: 'migrated' });

        const migrated = value === 'true';

        if (!migrated) {
            await Preferences.migrate();
            Preferences.removeOld();
            Preferences.set({ key: 'migrated', value: 'true' });
        }
    },
    set: async (keyVal, val) => {
        await Preferences.set({ key: keyVal, value: val });
    },
    get: async (keyVal) => {
        const { value } = await Preferences.get({ key: keyVal });
        return value;
    },
    clean: async () => {
        await Preferences.clear();
    },
};
