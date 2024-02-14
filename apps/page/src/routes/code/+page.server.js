import fs from 'fs';

let getFile = (fileSrc) => {
	let fileText = fs.readFileSync(fileSrc, 'utf8');

	return {
		[fileSrc.replace(`./static/code/`, '')]: {
			file: {
				contents: fileText
			}
		}
	};
};

export async function load({ url, params, session, cookies }) {
	return {
		codeFiles: {
			'index.html': {
				file: {
					contents: fs.readFileSync('./static/code/index.html', 'utf8')
				}
			},
			'package.json': {
				file: {
					contents: fs.readFileSync('./static/code/package.json', 'utf8')
				}
			},
			'vite.config.js': {
				file: {
					contents: fs.readFileSync('./static/code/vite.config.js', 'utf8')
				}
			},
			'tailwind.config.cjs': {
				file: {
					contents: fs.readFileSync('./static/code/tailwind.config.cjs', 'utf8')
				}
			},
			src: {
				directory: {
					'App.svelte': {
						file: { contents: fs.readFileSync('./static/code/src/App.svelte', 'utf8') }
					},
					'app.css': {
						file: { contents: fs.readFileSync('./static/code/src/app.css', 'utf8') }
					},
					'main.js': {
						file: { contents: fs.readFileSync('./static/code/src/main.js', 'utf8') }
					},

					components: {
						directory: {
							'Counter.svelte': {
								file: {
									contents: fs.readFileSync('./static/code/src/components/Counter.svelte', 'utf8')
								}
							}
						}
					}
				}
			}
		}
	};
}
