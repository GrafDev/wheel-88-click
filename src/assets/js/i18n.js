import i18next from 'i18next';

const resources = {
    en: {
        translation: {
            press_spin: 'PRESS TO SPIN THE WHEEL',
            spin_button: 'SPIN!',
            current_win: 'Current Win:',
            congrats: 'Congratulations! You won:',
            free_spins: 'Free Spins',
            claim_bonus: 'CLAIM BONUS'
        }
    },
    tr: {
        translation: {
            press_spin: 'TEKERLEĞİ ÇEVİRMEK İÇİN BASIN',
            spin_button: 'ÇEVİR!',
            current_win: 'Mevcut Kazanç:',
            congrats: 'Tebrikler! Kazandınız:',
            free_spins: 'Ücretsiz Dönüş',
            claim_bonus: 'BONUS AL'
        }
    }
};

export async function setupI18n() {
    await i18next.init({
        resources,
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });
    return i18next;
}
