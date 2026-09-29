// Logging levels where their corresponding integer values represent the increasing levels of fatality.
const enum LogLevel {
  Trace,
  Debug,
  Info,
  Warn,
  Error,
  Fatal
}

const logLevelStrings: Record<LogLevel, string> = {
  [LogLevel.Trace]: "TRACE",
  [LogLevel.Debug]: "DEBUG",
  [LogLevel.Info]: "INFO",
  [LogLevel.Warn]: "WARN",
  [LogLevel.Error]: "ERROR",
  [LogLevel.Fatal]: "FATAL"
};

const minLoggingLevel: LogLevel = LogLevel.Trace;

function logMessage(level: LogLevel, msg: string): void {
  if (level < minLoggingLevel) return;

  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}] [${logLevelStrings[level]}]: ${msg}`);
}

export const trace = logMessage.bind(null, LogLevel.Trace);
export const debug = logMessage.bind(null, LogLevel.Debug);
export const info = logMessage.bind(null, LogLevel.Info);
export const warn = logMessage.bind(null, LogLevel.Warn);
export const error = logMessage.bind(null, LogLevel.Error);
export const fatal = logMessage.bind(null, LogLevel.Fatal);
