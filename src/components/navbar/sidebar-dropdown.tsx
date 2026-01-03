'use client';

import { FC } from 'react';
import { StoreItem } from '@/types/products';

type SidebarDropdownProps = {
	stores: StoreItem[];
	activeStore: string;
	onSelectStore: (storeId: string) => void;
	className?: string;
};

const SidebarDropdown: FC<SidebarDropdownProps> = ({
	stores,
	activeStore,
	onSelectStore,
	className = '',
}) => {
	return (
		<div className={`max-h-[60vh] overflow-y-auto ${className}`}>
			<ul className="space-y-2 p-2">
				{stores.map(store => {
					const Icon = store.icon;
					const isActive = activeStore === store.id;

					return (
						<li key={store.id}>
							<button
								onClick={() => onSelectStore(store.id)}
								className={`
									group flex w-full items-center gap-3 rounded-md px-3 py-2
									text-sm transition-all
									${
										isActive
											? 'bg-eba-primary/10 text-eba-primary font-medium'
											: 'text-gray-700 hover:bg-gray-100 hover:text-eba-primary'
									}
								`}
							>
								<Icon
									size={18}
									className={`${
										isActive
											? 'text-eba-primary'
											: 'text-gray-500 group-hover:text-eba-primary'
									}`}
								/>
								<span className="truncate">{store.name}</span>
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default SidebarDropdown;
