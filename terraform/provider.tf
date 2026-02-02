terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # S3 backend로 변경 가능 (선택사항)
  # backend "s3" {
  #   bucket = "hama-school-terraform-state"
  #   key    = "front/terraform.tfstate"
  #   region = "ap-northeast-2"
  # }
}

provider "aws" {
  region  = var.aws_region
  profile = var.aws_profile
}

# CloudFront는 us-east-1 리전의 ACM 인증서 필요
provider "aws" {
  alias   = "us_east_1"
  region  = "us-east-1"
  profile = var.aws_profile
}
