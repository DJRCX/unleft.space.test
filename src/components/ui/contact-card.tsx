import React from 'react';
import { cn } from '@/lib/utils';
import {
	type LucideIcon,
	Plus,
} from 'lucide-react';

export type ContactInfoItem = {
	icon: LucideIcon;
	label: string;
	value: string;
	href?: string;
};

type ContactInfoProps = React.ComponentProps<'div'> & ContactInfoItem;

type ContactCardProps = React.ComponentProps<'div'> & {
	// Content props
	title?: string;
	description?: string;
	contactInfo?: ContactInfoItem[];
	formSectionClassName?: string;
	infoExtra?: React.ReactNode;
};

export function ContactCard({
	title = 'Contact With Us',
	description = 'If you have any questions regarding our Services or need help, please fill out the form here. We do our best to respond within 1 business day.',
	contactInfo,
	className,
	formSectionClassName,
	infoExtra,
	children,
	...props
}: ContactCardProps) {
	return (
		<div
			className={cn(
				'bg-background/40 border border-border relative grid h-full w-full shadow-2xl lg:grid-cols-12 rounded-3xl backdrop-blur-sm overflow-visible',
				className,
			)}
			{...props}
		>
			<Plus className="absolute -top-3 -left-3 h-6 w-6 text-accent-glow" />
			<Plus className="absolute -top-3 -right-3 h-6 w-6 text-accent-glow" />
			<Plus className="absolute -bottom-3 -left-3 h-6 w-6 text-accent-glow" />
			<Plus className="absolute -right-3 -bottom-3 h-6 w-6 text-accent-glow" />
			
            <div className="flex flex-col justify-between lg:col-span-3">
				<div className="relative h-full space-y-6 px-6 py-10 md:p-12 text-left">
					<h2 className="text-3xl font-bold md:text-4xl lg:text-5xl text-text-primary tracking-tighter">
						{title}
					</h2>
					<p className="text-text-secondary max-w-xl text-sm md:text-base lg:text-lg leading-relaxed">
						{description}
					</p>
					{infoExtra}
					<div className="grid gap-6 mt-8">
						{contactInfo?.map((info, index) => (
							<ContactInfo key={index} {...info} />
						))}
					</div>
				</div>
			</div>
			<div
				className={cn(
					'bg-card/20 flex h-full w-full items-center border-t border-border p-6 lg:col-span-9 md:border-t-0 md:border-l',
					formSectionClassName,
				)}
			>
				{children}
			</div>
		</div>
	);
}

function ContactInfo({
	icon: Icon,
	label,
	value,
	href,
	className,
	...props
}: ContactInfoProps) {
	const content = (
		<div className={cn('flex items-center gap-4 py-2 group', className)} {...props}>
			<div className="bg-accent-primary/10 rounded-xl p-3 border border-accent-primary/20 group-hover:bg-accent-primary/20 transition-colors">
				<Icon className="h-5 w-5 text-accent-glow" />
			</div>
			<div>
				<p className="font-medium text-text-primary text-sm">{label}</p>
				<p className="text-text-secondary text-xs">{value}</p>
			</div>
		</div>
	);

	if (href) {
		return (
			<a href={href} target="_blank" rel="noopener noreferrer" className="block w-full">
				{content}
			</a>
		);
	}

	return content;
}
