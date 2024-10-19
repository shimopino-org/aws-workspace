terraform {
  required_version = ">= 1.9.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    key = "environment/todo-app/terraform.tfstate"
  }
}

provider "aws" {
  region = "ap-northeast-1"
}
