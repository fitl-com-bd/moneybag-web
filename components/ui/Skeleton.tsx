// import { cn, getRandomFromArray } from "src/utils"

import { cn, getRandomFromArray } from "@/utils"
import { FC } from "react"

type SkeletonProps = {
  className?: string
}

type SkeletonWordProps = SkeletonProps & {
  big?: boolean
}

type SkeletonWordsProps = SkeletonProps & {
  number?: number
}

type SkeletonParagraphProps = SkeletonProps & {
  line?: number
}

type SkeletonButtonProps = SkeletonProps & {
  width?: number
  height?: number
}

type SkeletonTableProps = SkeletonProps & {
  rows?: number
}

export const LoadingBar: FC<SkeletonProps> = ({ className }) => (
  <div className={cn("bg-loader animate-pulse w-100 h-6 rounded", className)} />
)

export const LoadingWord: FC<SkeletonWordProps> = ({ className, big = false }) => (
  <div className={cn(big ? "w-20" : "w-15", "bg-loader h-4 rounded animate-pulse", className)} />
)

export const LoadingWords: FC<SkeletonWordsProps> = ({ className, number = 3 }) => (
  <div className={cn("d-flex h-6 gap-3", className)}>
    {Array.from(Array(number).keys()).map((item, index) => (
      <LoadingWord key={index} big={item % 2 === 0} className="h-100" />
    ))}
  </div>
)

export const LoadingParagraph: FC<SkeletonParagraphProps> = ({ className, line = 3 }) => (
  <div className={cn("d-flex flex-wrap gap-3", className)}>
    {Array.from(Array(line).keys()).map((item, index) => (
      <LoadingWords key={index} number={index % 2 === 0 ? 4 : 3} />
    ))}
  </div>
)

export const LoadingButton: FC<SkeletonButtonProps> = ({ className, width = 100, height = 40 }) => (
  <div className={cn("bg-loader rounded", className)} style={{ width, height }}></div>
)

export const LoadingTable: FC<SkeletonTableProps> = ({ className, rows = 11 }) => (
  <div className={cn("d-grid gap-2 pt-1", className)}>
    {Array.from(Array(rows).keys()).map((_, index) => (
      <LoadingBar key={index} className="h-10.75" />
    ))}
  </div>
)

export const LoadingGraph: FC<SkeletonProps> = ({ className }) => (
  <div className={cn("d-flex align-items-end gap-2", className)}>
    {Array.from({ length: 5 }).map((_, i) => (
      <LoadingBar
        key={i}
        className={`h-${getRandomFromArray([25, 50, 75, 100])} w-1/6 h-full absolute left-${i}/6 animate-pulse`}
      />
    ))}
  </div>
)

export const LoadingDashboard: FC<SkeletonProps> = ({ className }) => (
  <div className={cn("d-grid gap-3", className)}>
    <div className="shadow-sm bg-white border-0 rounded overflow-hidden d-grid grid-cols-2 grid-cols-md-4">
      <div className="px-3 my-8 border-end">
        <LoadingWord className="text-secondary small mb-2" />
        <LoadingBar className="h-6 mb-0.5" />
      </div>
      <div className="px-3 my-8 border-end">
        <LoadingWord className="text-secondary small mb-2" />
        <LoadingBar className="h-6 mb-0.5" />
      </div>
      <div className="px-3 my-8 border-end">
        <LoadingWord className="text-secondary small mb-2" />
        <LoadingBar className="h-6 mb-0.5" />
      </div>
      <div className="px-3 my-8 border-end">
        <LoadingWord className="text-secondary small mb-2" />
        <LoadingBar className="h-6 mb-0.5" />
      </div>
    </div>
    <div className="d-grid grid-cols-md-2 gap-3">
      <div className="shadow-sm bg-white border-0 rounded overflow-hidden px-3 py-4">
        <LoadingWords className="mb-3" />
        <LoadingGraph className="h-87.5" />
      </div>
      <div className="shadow-sm bg-white border-0 rounded overflow-hidden px-3 py-4">
        <LoadingWords className="mb-3" />
        <LoadingGraph className="h-87.5" />
      </div>
    </div>
    <div className="shadow-sm bg-white border-0 rounded overflow-hidden d-flex flex-column">
      <LoadingWords className="mb-3 ms-3 mt-3" />
      <LoadingTable
        className="w-100 mx-3 mb-2"
        // style={{ height: "588px" }}
      />
    </div>
  </div>
)
