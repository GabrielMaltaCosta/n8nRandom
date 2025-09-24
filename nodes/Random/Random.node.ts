import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import fetch from 'node-fetch';

	interface INodeExecuteContext {
			getInputData(): INodeExecutionData[];
			getNodeParameter(name: string, index: number): unknown;
			helpers: {
					returnJsonArray(items: IDataObject[]): INodeExecutionData[];
			};
	}

	async function TrueRandomNumberGenerator(number:number, number2:number): Promise<number> {

		const url = `https://www.random.org/integers/?num=1&min=${number}&max=${number2}&col=1&base=10&format=plain&rnd=new`;
		try {
				const res = await fetch(url);
				const text = await res.text();
				const number = parseInt(text.trim(), 10);
				return number;
		} catch (error: any) {
				return -1
		}
	}

	export class Random implements INodeType {
		description: INodeTypeDescription = {
			displayName: 'Random',
			name: 'random',
			group: ['transform'],
			version: 1,
			icon: 'file:random-img.svg',
			description: 'Node para mostrar um número aleatório entre o mínimo e máximo informado pelo usuarioa',
			defaults: {
				name: 'Random',
			},
			inputs: ['main'],
			outputs: ['main'],
			properties: [
				{
					displayName: 'Mínimo',
					name: 'number',
					type: 'number',
					default: 1,
					required: true,
					description: 'Numero que represta o Mínimo',
				},
				{
					displayName: 'Máximo',
					name: 'number2',
					type: 'number',
					default: 10,
					required: true,
					description: 'Numero que represta o Máximo',
				},
			],

		};

	async execute(this: INodeExecuteContext): Promise<INodeExecutionData[][]> {

		const items = this.getInputData();
    const results: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
      const number = this.getNodeParameter('number', i) as number;
      const number2 = this.getNodeParameter('number2', i) as number;

  		const randomNumber = await TrueRandomNumberGenerator(number, number2);

			results.push({
        json: {
          minimo: number,maximo: number2, random: randomNumber,
        },
      });
		}


		return [this.helpers.returnJsonArray(results)];
	}
}
