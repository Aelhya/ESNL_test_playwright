import {test, expect} from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://aelhya.github.io/ESNL_site_demo/');
});

test.describe('remplir_formulaire', () => {
    test('devrait valider le formulaire lorsque tous les champs sont remplis correctement', async ({page}) => {
        // Remplir les champs du formulaire
        await page.fill('#firstName', 'John');
        await page.fill('#lastName', 'Doe');
        await page.fill('#age', '30');
        await page.fill('#password', 'Test1234'); // Mot de passe valide

        // Soumettre le formulaire
        await page.click('button[type="submit"]');

        // Vérifier que le message "Le formulaire est ok." est affiché
        const formMessage = await page.locator('#formMessage').innerText();
        expect(formMessage).toBe('Le formulaire est ok.');
    });

    test('devrait afficher des erreurs lorsque des champs sont manquants', async ({page}) => {
        // Laisser des champs vides
        await page.fill('#firstName', ''); // incorrect
        await page.fill('#lastName', ''); // incorrect
        await page.fill('#age', '30'); // valide
        await page.fill('#password', 'Test1234'); //  valide

        // Soumettre le formulaire
        await page.click('button[type="submit"]');

        // Vérifier que des messages d'erreur sont affichés
        const formMessage = await page.locator('#formMessage').innerText();
        expect(formMessage).toBe('Des erreurs sont présentes.');

        // Vérifier que les champs manquants sont signalés
        const firstNameError = await page.locator('#firstNameError').innerText();
        expect(firstNameError).toBe('Le prénom est requis.');

        const lastNameError = await page.locator('#lastNameError').innerText();
        expect(lastNameError).toBe('Le nom est requis.');
    });

    test('devrait afficher une erreur lorsque le mot de passe ne respecte pas les règles', async ({page}) => {
        // Remplir les champs avec un mot de passe invalide
        await page.fill('#firstName', 'John');
        await page.fill('#lastName', 'Doe');
        await page.fill('#age', '30');
        await page.fill('#password', 'test'); // Mot de passe invalide (pas de majuscule, moins de 8 char)

        // Soumettre le formulaire
        await page.click('button[type="submit"]');

        // Vérifier que le message d'erreur est affiché pour le mot de passe
        const passwordError = await page.locator('#passwordError').innerText();
        expect(passwordError).toBe('Le mot de passe doit contenir au moins 8 caractères, dont 1 majuscule, 1 minuscule et 1 chiffre.');
    });
});