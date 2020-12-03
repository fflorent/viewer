/**
 * @copyright Copyright (c) 2020 Florent Fayolle <florent@zeteo.me>
 *
 * @author Florent Fayolle <florent@zeteo.me>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

import { randHash } from '../utils'
const randUser = randHash()

describe('Download image.png in viewer', function() {
	before(function() {
		// Init user
		cy.nextcloudCreateUser(randUser, 'password')
		cy.login(randUser, 'password')

		// Upload test files
		cy.uploadFile('image.png', 'image/png')
		cy.visit('/apps/files')

		// wait a bit for things to be settled
		cy.wait(2000)
	})

	after(function() {
		cy.logout()
	})

	it('See image.png in the list', function() {
		cy.get('#fileList tr[data-file="image.png"]', { timeout: 10000 })
			.should('contain', 'image.png')
	})

	it('Open the viewer on file click', function() {
		cy.openFile('image.png')
		cy.get('body > .viewer').should('be.visible')
	})

	it('Does not see a loading animation', function() {
		cy.get('body > .viewer', { timeout: 10000 })
			.should('be.visible')
			.and('have.class', 'modal-mask')
			.and('not.have.class', 'icon-loading')
	})

	it('Download the image', function() {
		// open the menu
		cy.get('body > .viewer .modal-header button.action-item__menutoggle').click()
		// delete the file
		cy.get('.action-button__icon.icon-download').click()
	})

	it('Compare downloaded file with asset', function() {
		// TODO
	})
})
