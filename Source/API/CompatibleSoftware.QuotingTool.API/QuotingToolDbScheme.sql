IF EXISTS (SELECT name FROM master.dbo.sysdatabases WHERE name = N'QuotingTool')
DROP DATABASE [QuotingTool]

CREATE DATABASE [QuotingTool]
GO

USE [QuotingTool]
GO

CREATE TABLE [dbo].[Customer](
	[CustomerId] [int] IDENTITY(1,1) PRIMARY KEY CLUSTERED,
	[Name] [nvarchar](50) NOT NULL UNIQUE
)
GO