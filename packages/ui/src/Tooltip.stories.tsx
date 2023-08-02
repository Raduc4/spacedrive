import { Meta } from '@storybook/react';
import { Button } from './Button';
import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
	title: 'Tooltip',
	component: Tooltip,
	argTypes: {},
	parameters: {
		backgrounds: {
			default: 'light'
		}
	},
	args: {
		children: 'Select'
	}
};

export default meta;

export const TooltipDefault = () => {
	return (
		<div className="w-32">
			<Tooltip
				label="Coming soon! This alpha release doesn't include library sync, it will be ready very soon."
				tooltipClassName="bg-black"
				position="right"
			>
				<Button disabled variant="dotted" className="mt-1 w-full">
					Connect Node
				</Button>
			</Tooltip>
		</div>
	);
};
