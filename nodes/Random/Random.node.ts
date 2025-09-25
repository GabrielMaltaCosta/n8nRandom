import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOutput,
} from 'n8n-workflow';
import fetch from 'node-fetch';

const BASE_URL = 'https://www.random.org/integers/';

async function generateRandomNumber(min: number, max: number): Promise<number> {
	const params = new URLSearchParams({
		num: '1',
		min: min.toString(),
		max: max.toString(),
		col: '1',
		base: '10',
		format: 'plain',
		rnd: 'new',
	});

	const url = new URL(`?${params.toString()}`, BASE_URL).toString();

	try {
		const res = await fetch(url);
		const text = await res.text();
		return parseInt(text.trim(), 10);
	} catch (error: any) {
		return -1;
	}
}

export class Random implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Random',
		name: 'random',
		group: ['transform'],
		version: 1,
		icon: 'file:random-img.svg',
		description:
			'Node para mostrar um número aleatório entre o mínimo e máximo informado pelo usuário',
		defaults: {
			name: 'True Random Number Generator',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'Mínimo',
				name: 'min',
				type: 'number',
				default: 1,
				required: true,
				description: 'Número que representa o Mínimo',
			},
			{
				displayName: 'Máximo',
				name: 'max',
				type: 'number',
				default: 10,
				required: true,
				description: 'Numero que representa o Máximo',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<NodeOutput> {
		const items = this.getInputData();
		const results: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const min = this.getNodeParameter('min', i) as number;
			const max = this.getNodeParameter('max', i) as number;

			const random = await generateRandomNumber(min, max);

			results.push({
				json: {
					min,
					max,
					random,
				},
			});
		}

		return [this.helpers.returnJsonArray(results)];
	}
}
