'use client';

import { cn } from '@/lib/utils';
import React, { useState } from 'react';

export interface CardFlipProps {
	title?: string;
	subtitle?: string;
	description?: string;
	features?: string[];
	color?: string;
	icon?: React.ReactNode;
	backIcon?: React.ReactNode;
	ctaLabel?: string;
	ctaHref?: string;
}

export default function CardFlip({
	title = 'Build MVPs Fast',
	subtitle = 'Launch your idea in record time',
	description = 'Copy, paste, customize—and launch your MVP faster than ever.',
	features = ['Fast Delivery', 'Scalable', 'Modern Stack', 'Production Ready'],
	color = '#7C3AED',
	icon,
	backIcon,
	ctaLabel = 'Learn More',
	ctaHref = '#',
}: CardFlipProps) {
	const [isFlipped, setIsFlipped] = useState(false);
	const p = genDeterministicPattern(title);

	return (
		<div
			style={{ ['--primary' as any]: color }}
			className="group relative h-[420px] w-full [perspective:2000px]"
			onMouseEnter={() => setIsFlipped(true)}
			onMouseLeave={() => setIsFlipped(false)}
		>
			<div
				className={cn(
					'relative h-full w-full',
					'[transform-style:preserve-3d]',
					'transition-all duration-700',
					isFlipped ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]'
				)}
			>
				{/* Front of card */}
				<div
					className={cn(
						'absolute inset-0 h-full w-full',
						'[transform:rotateY(0deg)] [backface-visibility:hidden]',
						'overflow-hidden rounded-xl',
						'border border-[#2D2D44] bg-[#0A0A0F]/70',
						'shadow-lg',
						'transition-all duration-700',
						'group-hover:border-[var(--primary)]/30 group-hover:shadow-[0_0_30px_rgba(0,0,0,0.5)]',
						isFlipped ? 'opacity-0' : 'opacity-100'
					)}
				>
					{/* Deterministic Grid Pattern (from Grid Feature Cards) */}
					<div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
						<div className="from-foreground/5 to-foreground/1 absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] opacity-100">
							<GridPattern
								width={20}
								height={20}
								x="-12"
								y="4"
								squares={p}
								className="fill-foreground/5 stroke-foreground/25 absolute inset-0 h-full w-full mix-blend-overlay"
							/>
						</div>
					</div>

					{/* Layout aligned with Expertise pillars */}
					<div className="absolute inset-0 flex flex-col p-8">
						{/* Icon top-left-ish */}
						<div
							className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#2D2D44] transition-all duration-500 group-hover:scale-110 group-hover:border-[var(--primary)]/40"
							style={{ backgroundColor: `${color}15` }}
						>
							{icon && <div className="text-[var(--primary)]">{icon}</div>}
						</div>

						{/* Content bottom-left */}
						<div className="mt-auto">
							<h3 className="text-xl font-semibold tracking-tight text-[#E5E7EB] transition-all duration-500 group-hover:translate-y-[-4px]">
								{title}
							</h3>
							<p className="mt-2 line-clamp-2 text-sm text-[#9CA3AF] font-light transition-all delay-[50ms] duration-500 group-hover:translate-y-[-4px]">
								{subtitle}
							</p>
						</div>
					</div>
				</div>

				{/* Back of card */}
				<div
					className={cn(
						'absolute inset-0 h-full w-full',
						'[transform:rotateY(180deg)] [backface-visibility:hidden]',
						'rounded-xl p-8',
						'border border-[var(--primary)]/20 bg-[#0D0D14]',
						'shadow-lg',
						'flex flex-col overflow-hidden',
						'transition-all duration-700',
						!isFlipped ? 'opacity-0' : 'opacity-100'
					)}
				>
					{/* Background gradient */}
					<div
						className="pointer-events-none absolute inset-0 rounded-xl"
						style={{
							background: `radial-gradient(ellipse at top, ${color}15, transparent 60%)`,
						}}
					/>

					<div className="relative z-10 flex-1 flex flex-col">
						<div className="mb-6 flex items-center gap-3">
							<div
								className="flex h-10 w-10 items-center justify-center rounded-lg"
								style={{ backgroundColor: `${color}25` }}
							>
								{backIcon ? <div style={{ color }}>{backIcon}</div> : <div className="h-4 w-4 rounded-full" style={{ backgroundColor: color }} />}
							</div>
							<h3 className="text-lg font-semibold tracking-tight text-[#E5E7EB]">{title}</h3>
						</div>

						<p className="text-sm leading-relaxed text-[#9CA3AF] mb-6">{description}</p>

						<div className="space-y-3">
							{features.map((feature, index) => (
								<div
									key={feature}
									className="flex items-center gap-3 text-sm text-[#D1D5DB]"
									style={{
										transform: isFlipped ? 'translateX(0)' : 'translateX(-10px)',
										opacity: isFlipped ? 1 : 0,
										transitionDelay: `${index * 80 + 150}ms`,
										transition: 'transform 0.4s ease, opacity 0.4s ease',
									}}
								>
									<div className="h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: color }} />
									<span className="font-medium">{feature}</span>
								</div>
							))}
						</div>

						<div className="mt-auto pt-6 border-t border-[#2D2D44]">
							<a
								href={ctaHref}
								className="flex items-center justify-between rounded-lg p-3 transition-all duration-300 hover:scale-[1.02] bg-[#1A1A2E]/50 border border-[#2D2D44] group/btn"
								style={{ ['--btn-color' as any]: color }}
							>
								<span className="text-sm font-semibold text-[#E5E7EB]">{ctaLabel}</span>
								<svg
									className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
									style={{ color }}
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
								</svg>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

// grid pattern components & logic helpers
function GridPattern({
	width,
	height,
	x,
	y,
	squares,
	...props
}: React.ComponentProps<'svg'> & { width: number; height: number; x: string; y: string; squares?: number[][] }) {
	const patternId = React.useId();

	return (
		<svg aria-hidden="true" {...props}>
			<defs>
				<pattern id={patternId} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
					<path d={`M.5 ${height}V.5H${width}`} fill="none" />
				</pattern>
			</defs>
			<rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
			{squares && (
				<svg x={x} y={y} className="overflow-visible">
					{squares.map(([x, y], index) => (
						<rect strokeWidth="0" key={index} width={width + 1} height={height + 1} x={x * width} y={y * height} />
					))}
				</svg>
			)}
		</svg>
	);
}

function getSeedFromString(str: string): number {
	let hash = 0;
	if (str.length === 0) return hash;
	for (let i = 0; i < str.length; i++) {
		hash = (hash << 5) - hash + str.charCodeAt(i);
		hash |= 0;
	}
	return Math.abs(hash);
}

function genDeterministicPattern(seedStr: string, length = 5): number[][] {
	const seed = getSeedFromString(seedStr);
	return Array.from({ length }, (_, i) => [
		((seed + i * 7) % 4) + 7, // deterministic x between 7 and 10
		((seed + i * 11) % 6) + 1, // deterministic y between 1 and 6
	]);
}
