import winston from "winston";
import path from "path";

const { combine, timestamp, printf, errors } = winston.format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level.toUpperCase()}] ${stack ?? message}`;
});

const transports: winston.transport[] = [
  new winston.transports.Console(),
];

const logFolder = process.env.LOG_FOLDER;
if (logFolder) {
  transports.push(
    new winston.transports.File({
      filename: path.join(logFolder, "error.log"),
      level: "error",
    }),
    new winston.transports.File({
      filename: path.join(logFolder, "combined.log"),
    }),
  );
}

const logger = winston.createLogger({
  level: "info",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }),
    logFormat,
  ),
  transports,
});

export default logger;
