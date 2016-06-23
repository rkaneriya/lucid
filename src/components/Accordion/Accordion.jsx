import _ from 'lodash';
import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, findTypes }  from '../../util/component-types';

import ExpanderPanel from '../ExpanderPanel/ExpanderPanel';

import * as reducers from '../Accordion/Accordion.reducers';

const cx = lucidClassNames.bind('&-Accordion');

const {
	func,
	object,
	number,
	string,
} = React.PropTypes;

/**
* {"categories": ["layout"], "madeFrom": ["ExpanderPanel"]}
*
* This is a container that renders panels and controls its expansion/retraction.
*/
const Accordion = createClass({
	displayName: 'Accordion',

	components: {
		Item: ExpanderPanel,
		Header: ExpanderPanel.Header,
	},

	reducers,

	propTypes: {
		/**
		* Appended to the component-specific class names set on the root
		* element.
		*/
		className: string,

		/**
		* Indicates which item is expanded.
		*/
		selectedIndex: number,

		/**
		* Called when the user clicks on the component's header of an item.
		*
		* Signature: `(itemIndex, { event, props }) => {}`
		*/
		onSelect: func,

		/**
		* Passed through to the root element.
		*/
		style: object,
	},

	getDefaultProps() {
		return {
			onSelect: _.noop,
		};
	},

	handleToggle(isExpanded, index, event) {
		const selectedIndex = isExpanded ? index : null;

		this.props.onSelect(selectedIndex, {
			event,
			props: this.props,
		});
	},

	render() {
		const {
			style,
			className,
			selectedIndex,
			...passThroughs,
		} = this.props;

		const itemChildProps = _.map(findTypes(this.props, Accordion.Item), 'props');

		return (
			<div
				{...passThroughs}
				className={cx('&', className)}
				style={style}>
				{_.map(itemChildProps, (itemChildProp, index) => {
					return <ExpanderPanel
							key={index}
							{...itemChildProp}
							className={cx('&-Item')}
							onToggle={(isExpanded, { event }) => this.handleToggle(isExpanded, index, event)}
							isExpanded={!itemChildProp.isDisabled && selectedIndex === index}/>;
				})}
			</div>
		);
	},
});

export default Accordion;