variable "aws_region" {
  description = "AWS Region"
  type        = string
  default     = "ap-northeast-2"
}

variable "aws_profile" {
  description = "AWS CLI Profile"
  type        = string
  default     = "default"
}

variable "project_name" {
  description = "Project name"
  type        = string
  default     = "hama-school-front"
}

variable "environment" {
  description = "Environment (dev, staging, prod)"
  type        = string
  default     = "prod"
}

variable "domain_name" {
  description = "Custom domain name for CloudFront (optional, leave empty for CloudFront default domain)"
  type        = string
  default     = "schoolwar.kr"
}

variable "acm_certificate_arn" {
  description = "ACM certificate ARN for CloudFront (must be in us-east-1, only needed if domain_name is set)"
  type        = string
  default     = "arn:aws:acm:us-east-1:971551576213:certificate/276d981f-09b8-451b-9de8-eafd2f6fc75f"
}
