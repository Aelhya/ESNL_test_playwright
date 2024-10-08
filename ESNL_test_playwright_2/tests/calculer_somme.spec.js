import {test, expect} from '@playwright/test';

test.describe('Calculer somme', () => {
    test('devrait calculer correctement la somme de deux nombres', async ({page}) => {
        // Naviguer vers la page
        await page.goto('https://aelhya.github.io/ESNL_site_demo/');

        // Remplir les inputs avec des nombres
        await page.fill('#number1', '5');
        await page.fill('#number2', '3');

        // Cliquer sur le bouton de calcul
        await page.click('#calculateBtn');

        // Vérifier si la somme correcte est affichée
        const resultText = await page.locator('#result').innerText();
        expect(resultText).toBe('La somme est : 8');
    });

    test('devrait afficher un message d\'erreur si les valeurs ne sont pas des nombres', async ({page}) => {
        // Naviguer vers la page
        await page.goto('https://aelhya.github.io/ESNL_site_demo/');

        // Remplir les inputs avec des valeurs invalides
        await page.fill('#number1', '');
        await page.fill('#number2', '');

        // Cliquer sur le bouton de calcul
        await page.click('#calculateBtn');

        // Vérifier si le message d'erreur est affiché
        const resultText = await page.locator('#result').innerText();
        expect(resultText).toBe('Veuillez entrer des nombres valides.');
    });
});