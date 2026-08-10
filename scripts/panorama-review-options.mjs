export function normalisePanoramaFilename(value) {
  const withPrefix = value.startsWith('scene-') ? value : `scene-${value}`
  return withPrefix.endsWith('.webp') ? withPrefix : `${withPrefix}.webp`
}

export function parseReviewArguments(args) {
  let includeAll = false
  let outputDirectory = null
  const inputFiles = []
  const explicitNames = []

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index]
    if (argument === '--all') {
      includeAll = true
      continue
    }
    if (argument === '--output' || argument === '--input') {
      const value = args[index + 1]
      if (!value || value.startsWith('--')) throw new Error(`${argument} requires a path.`)
      index += 1
      if (argument === '--output') {
        if (outputDirectory !== null) throw new Error('--output may only be supplied once.')
        outputDirectory = value
      } else {
        inputFiles.push(value)
      }
      continue
    }
    if (argument.startsWith('--')) throw new Error(`Unknown option: ${argument}`)
    explicitNames.push(normalisePanoramaFilename(argument))
  }

  if (includeAll && (explicitNames.length > 0 || inputFiles.length > 0)) {
    throw new Error('--all cannot be combined with explicit scene IDs or input files.')
  }
  if (explicitNames.length > 0 && inputFiles.length > 0) {
    throw new Error('Explicit scene IDs cannot be combined with --input files.')
  }

  return {
    includeAll,
    outputDirectory,
    inputFiles,
    explicitNames,
  }
}
