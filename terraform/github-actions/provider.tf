terraform {
  required_version = ">= 1.9.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.71.0"
    }
  }

  backend "s3" {
    key = "github-actions/terraform.tfstate"
  }
}

provider "aws" {
  region = "ap-northeast-1"
}
